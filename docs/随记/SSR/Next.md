---

title: Next
order: 1
group:
  title: SSR

---

# Next.js

[Next.js 官方文档](https://nextjs.org/docs)

## 先建立正确认知

`Next.js` 不是一个“只能做 SSR 的 React 框架”，它更像是一个基于 React 的全栈框架，帮你把这些事情统一起来：

1. 路由
2. 服务端渲染
3. 静态生成
4. 接口开发
5. SEO
6. 前后端一体化部署

如果你是第一次接触 Next，建议学习顺序是：

1. 先学 `App Router`
2. 再补 `Pages Router`
3. 最后再学缓存、数据获取、接口路由这些进阶能力

原因很简单：

- 现在新项目默认更偏向 `App Router`
- 但历史项目里大量代码仍然使用 `Pages Router`
- 所以你要做到“新写会 `app`，旧项目能看懂 `pages`”

## 入门与进阶学习路线

### 入门阶段

你先只学这 5 件事：

1. 会创建 Next 项目并运行
2. 看懂 `app/page.tsx`、`app/layout.tsx`
3. 会写页面跳转 `Link`
4. 会写动态路由 `[id]`
5. 知道什么时候写 `'use client'`

### 进阶阶段

等你把上面跑通后，再学这 6 件事：

1. `Pages Router` 和 `App Router` 的差异
2. `SSR`、`SSG`、`ISR` 的区别
3. `getServerSideProps`、`getStaticProps`
4. `App Router` 里的服务端数据获取
5. `Route Handler` 和 `API Routes`
6. `cache`、`revalidate`、`no-store`

## `Pages Router` 和 `App Router` 的区别

| 对比项 | `Pages Router` | `App Router` |
| --- | --- | --- |
| 目录 | `pages/` | `app/` |
| 学习定位 | 老项目必须会 | 新项目优先学 |
| 页面入口 | `pages/index.tsx` | `app/page.tsx` |
| 动态路由 | `pages/posts/[id].tsx` | `app/posts/[id]/page.tsx` |
| 布局能力 | 通常自己封装 Layout | 原生支持 `layout.tsx` |
| 数据获取 | `getServerSideProps`、`getStaticProps` | 直接在服务端组件里 `await fetch()` |
| 组件默认行为 | 更接近传统 React 页面 | 默认是服务端组件 |
| 客户端交互 | 正常写 `useState/useEffect` | 需要加 `'use client'` |
| 接口写法 | `pages/api/*.ts` | `app/api/**/route.ts` |

## 最重要的一句话

在 `App Router` 中：

- 页面默认是服务端组件
- 只有需要交互时，才把组件写成客户端组件

什么时候需要 `'use client'`？

1. 你要用 `useState`
2. 你要用 `useEffect`
3. 你要绑定点击事件
4. 你要访问 `window`、`localStorage`
5. 你要使用浏览器端 Hook

如果都不需要，就尽量保持服务端组件。

## 教学案例目标

下面做一个最小但完整的教学案例：`文章列表 + 文章详情 + 搜索 + 接口`

你会同时看到两套实现：

1. `App Router` 版本
2. `Pages Router` 版本

这样你不是死记 API，而是能真正理解两套路由的思维差异。

## 第 0 步：创建项目

推荐先创建一个默认项目，先学 `App Router`。

```bash
pnpm create next-app
```

创建时你会看到交互式选项。对于新手，建议：

1. 选择 `TypeScript`
2. 选择 `ESLint`
3. 先使用默认模板
4. 先保留 `App Router`

启动项目：

```bash
pnpm dev
```

启动后先只关心这两个文件：

```bash
app/layout.tsx
app/page.tsx
```

## 第 1 步：先理解 `App Router`

### 目录结构

```bash
app/
  layout.tsx
  page.tsx
  posts/
    [id]/
      page.tsx
  api/
    posts/
      route.ts
components/
  SearchBox.tsx
lib/
  posts.ts
```

### 这套结构分别代表什么

- `layout.tsx`：公共布局
- `page.tsx`：当前路径对应的页面
- `[id]`：动态路由参数
- `route.ts`：服务端接口
- `components/`：可复用组件
- `lib/`：数据和工具函数

## 第 2 步：准备假数据

先不要接数据库，也不要接真实后端。新手先把“路由 + 渲染 + 交互”跑通最重要。

`lib/posts.ts`

```ts
export type Post = {
  id: string
  title: string
  summary: string
  content: string
}

const posts: Post[] = [
  {
    id: '1',
    title: '认识 Next.js',
    summary: '理解 Next.js 是什么，以及为什么它适合 React 全栈开发。',
    content: 'Next.js 是基于 React 的全栈框架，支持路由、SSR、接口和 SEO。',
  },
  {
    id: '2',
    title: 'Pages Router 与 App Router',
    summary: '掌握两套路由系统的定位和差异。',
    content: 'Pages Router 更常见于老项目，App Router 是当前更推荐的方式。',
  },
  {
    id: '3',
    title: '什么时候使用 use client',
    summary: '理解服务端组件与客户端组件的职责边界。',
    content: '只有在需要状态、事件、浏览器 API 时，才需要使用 use client。',
  },
]

export async function getPosts() {
  return posts
}

export async function getPostById(id: string) {
  return posts.find((item) => item.id === id)
}
```

## 第 3 步：完成 `App Router` 首页

`app/page.tsx`

```tsx
import SearchBox from '@/components/SearchBox'
import { getPosts } from '@/lib/posts'

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main>
      <h1>Next.js 入门案例</h1>
      <p>这是一个使用 App Router 编写的文章列表页面。</p>
      <SearchBox posts={posts} />
    </main>
  )
}
```

这段代码要注意 2 件事：

1. `page.tsx` 可以直接写成 `async`
2. 它默认运行在服务端，不需要 `getServerSideProps`

## 第 4 步：加入客户端搜索组件

因为搜索输入框需要状态，所以这个组件必须是客户端组件。

`components/SearchBox.tsx`

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function SearchBox({ posts }: { posts: Post[] }) {
  const [keyword, setKeyword] = useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <section>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="请输入文章标题关键字"
      />

      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

这里就是 `App Router` 最经典的模式：

- 服务端组件负责取数据
- 客户端组件负责交互

## 第 5 步：完成 `App Router` 详情页

`app/posts/[id]/page.tsx`

```tsx
import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      <article>{post.content}</article>
    </main>
  )
}
```

你需要记住：

1. `app/posts/[id]/page.tsx` 对应路径 `/posts/:id`
2. `params` 在这里是异步的，需要 `await`
3. 找不到数据时，可以直接 `notFound()`

## 第 6 步：补一个 `App Router` 接口

`app/api/posts/route.ts`

```ts
import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/posts'

export async function GET() {
  const posts = await getPosts()
  return NextResponse.json(posts)
}
```

访问地址：

```bash
/api/posts
```

这说明 Next 不只是页面框架，也可以顺手写服务端接口。

## 第 7 步：你已经学会了什么

如果上面的案例你能独立敲出来，说明你已经掌握了 `App Router` 入门能力：

1. 看懂 `app` 目录
2. 会写首页和详情页
3. 会写动态路由
4. 会写服务端组件
5. 会写客户端组件
6. 会写简单接口

## 第 8 步：再对照 `Pages Router`

很多旧项目依然是 `pages/` 结构，所以你必须看懂它。

### 目录结构

```bash
pages/
  index.tsx
  posts/
    [id].tsx
  api/
    posts.ts
lib/
  posts.ts
```

## 第 9 步：完成 `Pages Router` 首页

`pages/index.tsx`

```tsx
import Link from 'next/link'
import { getPosts, type Post } from '@/lib/posts'

export async function getServerSideProps() {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function HomePage({ posts }: { posts: Post[] }) {
  return (
    <main>
      <h1>Pages Router 首页</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

这里和 `App Router` 最大的不同是：

1. 页面组件本身通常只负责渲染
2. 服务端取数据写在 `getServerSideProps`
3. 数据通过 `props` 传给页面组件

## 第 10 步：完成 `Pages Router` 详情页

`pages/posts/[id].tsx`

```tsx
import { getPostById, type Post } from '@/lib/posts'

export async function getServerSideProps(context: { params?: { id?: string } }) {
  const id = context.params?.id

  if (!id) {
    return { notFound: true }
  }

  const post = await getPostById(id)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
    },
  }
}

export default function PostDetailPage({ post }: { post: Post }) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      <article>{post.content}</article>
    </main>
  )
}
```

## 第 11 步：完成 `Pages Router` 接口

`pages/api/posts.ts`

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '@/lib/posts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getPosts()
  res.status(200).json(posts)
}
```

## 第 12 步：一眼看懂两种写法的差异

### 同样是首页取数据

`Pages Router`

```tsx
export async function getServerSideProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

export default function Page({ posts }) {
  return <div>{posts.length}</div>
}
```

`App Router`

```tsx
export default async function Page() {
  const posts = await getPosts()
  return <div>{posts.length}</div>
}
```

结论：

- `Pages Router` 是“先取数据，再把数据塞给页面”
- `App Router` 是“页面本身就可以在服务端取数据”

## 第 13 步：进阶必须掌握的数据获取

### 1. `Pages Router`

#### SSR

每次请求都执行，使用：

```tsx
export async function getServerSideProps() {}
```

#### SSG

构建时生成静态页面，使用：

```tsx
export async function getStaticProps() {}
```

#### 动态静态路径

```tsx
export async function getStaticPaths() {}
```

### 2. `App Router`

`App Router` 不再用 `getServerSideProps` 和 `getStaticProps` 这套 API，直接在服务端组件里使用 `fetch`。

```tsx
export default async function Page() {
  const staticData = await fetch('https://example.com/api/posts', {
    cache: 'force-cache',
  })

  const dynamicData = await fetch('https://example.com/api/posts', {
    cache: 'no-store',
  })

  const revalidatedData = await fetch('https://example.com/api/posts', {
    next: { revalidate: 10 },
  })

  return <div>data</div>
}
```

你可以这样理解：

- `force-cache`：更像 `SSG`
- `no-store`：更像 `SSR`
- `revalidate`：更像 `ISR`

## 第 14 步：新手最容易混淆的点

### 1. 不是所有组件都要写 `'use client'`

错的理解：

- “我在 React 里一直写函数组件，所以在 Next 里所有组件都加 `use client`”

正确理解：

- 默认先写服务端组件
- 只有发生浏览器交互时，才写客户端组件

### 2. `App Router` 的页面不需要 `getServerSideProps`

很多人刚学时会问：

- “为什么 `app/page.tsx` 里不能写 `getServerSideProps`？”

因为这是两套路由系统：

1. `getServerSideProps` 属于 `Pages Router`
2. `app/` 目录使用的是服务端组件 + `fetch`

### 3. `layout.tsx` 是 `App Router` 的核心优势

`Pages Router` 也能做布局，但通常需要自己在 `_app.tsx` 或组件层封装。

而 `App Router` 可以天然支持：

1. 嵌套路由
2. 嵌套布局
3. `loading.tsx`
4. `error.tsx`

这也是为什么新项目更常优先使用 `App Router`。

## 第 15 步：给你的练习顺序

如果你完全没接触过 Next，建议按下面顺序练：

1. 先创建项目，只改 `app/page.tsx`
2. 做一个文章列表页
3. 加一个 `Link` 跳到详情页
4. 新建 `app/posts/[id]/page.tsx`
5. 把搜索框拆成 `'use client'` 组件
6. 加一个 `app/api/posts/route.ts`
7. 用同样的需求，再写一遍 `pages/` 版本
8. 最后再去理解 `cache`、`revalidate`

## 第 16 步：你现阶段应该记住的最少知识

只记这几条就够了：

1. 新项目优先学 `App Router`
2. 老项目常见 `Pages Router`
3. `app/page.tsx` 是页面
4. `app/posts/[id]/page.tsx` 是动态路由
5. `App Router` 默认是服务端组件
6. 需要交互才加 `'use client'`
7. `Pages Router` 通过 `getServerSideProps` 等 API 取数据
8. `App Router` 通过服务端组件里的 `fetch` 取数据

## 第 17 步：下一步建议

你把这篇案例敲完后，下一篇应该继续学：

1. `layout.tsx` 的嵌套布局
2. `loading.tsx` 和 `error.tsx`
3. `generateMetadata`
4. 表单提交和 Server Actions
5. 真正连接数据库或后端接口

如果你愿意，我下一步可以继续直接帮你补一篇：

1. `Next.js 路由与布局篇`
2. `Next.js 数据获取篇`
3. `Next.js App Router 实战篇`
