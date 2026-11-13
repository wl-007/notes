# OAuth2 表单登录与 Swagger 调试

对应提交：`1ba26fd`（2026-11-09，提交标题为“docs 鉴权”）。

这个提交让 Swagger UI 可以通过登录接口获取令牌，再向受保护接口发送 Bearer。它没有给 `/docs` 页面本身增加登录保护。

## 为什么原来的 JSON 登录要调整

Swagger 的 OAuth2 password flow 按约定发送表单，并读取顶层的 `access_token/token_type`。原先统一包装的 JSON 登录响应不符合这条交互链路。

| 内容 | 原实现 | 当前实现 |
| --- | --- | --- |
| 令牌提取 | `HTTPBearer` | `OAuth2PasswordBearer` |
| 登录入参 | JSON `UserLoginSchema` | `OAuth2PasswordRequestForm` |
| 登录响应 | `ResponseSchema[UserTokenSchema]` | 顶层 `UserTokenSchema` |
| Swagger | 手动提供 Bearer 的方式 | 可以从 Authorize 发起表单登录 |

原来的 JSON 客户端需要跟随这次变更；不能只改后端文档标签就认为请求契约未变。

## OAuth2PasswordBearer 不负责检查密码

```python
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_PREFIX.strip('/')}/sys/user/login",
    auto_error=False,
)
```

它声明 OpenAPI 安全方案、从请求头提取令牌；`tokenUrl` 告诉交互文档去哪里登录，不会自动生成登录路由。

`auto_error=False` 让缺少令牌时把 None 交给 `get_current_user()`，由项目返回自己的 401 结构。

地址用相对形式 `apiCommon/sys/user/login`，对应默认配置下根级 `/apiCommon/sys/user/login`。如果应用通过反向代理挂在子路径，应结合 OpenAPI 的 servers/root_path 检查最终请求地址。

## 登录路由怎样转换表单

```python
@UserRouter.post("/login", response_model=UserTokenSchema)
async def login(
    db: DbSession,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    return await UserService.login(
        db,
        UserLoginSchema(
            username=form_data.username,
            password=form_data.password,
        ),
    )
```

HTTP 边界处理表单，Service 继续接收普通 Schema，不需要知道 Swagger 的界面。

```bash
curl -X POST "http://127.0.0.1:8801/apiCommon/sys/user/login" \
  --data-urlencode "username=alice" \
  --data-urlencode "password=demo-password-123"
```

curl 会按 URL 编码表单发送。给同一路由发送 JSON，不会自动转换成 OAuth2 表单，通常因缺少必需表单字段返回 422。

## 在 Swagger UI 中调试

1. 启动项目，确认 MySQL、表结构和 JWT 密钥就绪，并注册一个用户。
2. 打开 `http://127.0.0.1:8801/docs`，点击 Authorize。
3. 输入用户名与密码，发起授权。
4. 执行 `/apiCommon/sys/user/me`，检查请求头是否包含 Bearer。
5. 修改密码后，旧令牌会失效，需要重新授权。

当前项目未要求额外的 OAuth2 client_id/client_secret，也没有定义 scopes 权限。不要为本地调试随意发明这些凭据。

## OAuth2、JWT 与 Session 的关系

OAuth2 描述授权相关的协议与流程，JWT 是一种令牌表示形式；OAuth2 并不要求所有 access token 都是 JWT。当前项目采用 password flow 作为账号登录与文档调试机制，再用 JWT 携带签名声明。

Cookie/Session 则是另一类常见会话方案：浏览器持有会话标识，服务端保存状态。JWT 也可以放在 Cookie 中传输，但那会引入不同的 Cookie、CORS 和 CSRF 设计，当前代码使用 Authorization 头。

如果后续接企业 SSO、第三方登录或面向公共客户端的新认证体系，应评估 OIDC、Authorization Code 与 PKCE；当前流程没有实现这些能力。

## “文档可登录”和“文档被保护”

当前 `FastAPI(lifespan=...)` 使用默认 `/docs`、`/redoc`、`/openapi.json`，没有为这些入口添加认证依赖。接口上的小锁表示操作声明了安全依赖，不表示接口描述本身保密。

如果需要限制文档访问，应单独设计文档路由保护或部署层访问规则。生产环境是否开放文档也是部署决策，本次没有修改这些行为。

源码：`backend/app/api/sys/user/auth.py`、`backend/app/api/sys/user/controller.py`。

参考：[OAuth2 password flow](https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/)、[表单登录与 JWT](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)。
