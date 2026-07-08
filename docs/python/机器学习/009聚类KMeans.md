# 009 聚类 KMeans

## 聚类是什么

聚类是一类无监督学习方法。

它的目标是在没有标签的前提下，根据样本之间的相似性，把样本自动分成若干组。

## 聚类的应用场景

- 用户分群
- 商品分层
- 客户画像
- 异常分析辅助
- 图像分割

## KMeans 是什么

KMeans 是最常见的聚类算法之一。

它通过寻找若干个聚类中心，把每个样本分到最近的中心所属的类别中。

## KMeans 的流程

1. 先确定要聚成几类 `K`
2. 随机选择 `K` 个初始中心
3. 计算每个样本到各中心的距离
4. 把样本分给最近的中心
5. 重新计算每一类的中心点
6. 重复直到中心不再变化

## KMeans 的优缺点

### 优点

- 简单
- 高效
- 适合做初步分群

### 缺点

- 需要提前指定 `K`
- 对初始中心敏感
- 对异常值敏感
- 更适合球状或团状簇

## 常见评估指标

- SSE：越小越好
- SC：轮廓系数，越大越好
- CH：越大越好

## 肘部法

肘部法常用于帮助选择 `K`。

做法是观察 `K` 变大时 SSE 的下降趋势，找到下降速度开始明显变缓的拐点。

## sklearn 示例

```python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=500, centers=4, random_state=42)

model = KMeans(n_clusters=4, random_state=42, n_init=10)
y_pred = model.fit_predict(X)

print("SSE:", model.inertia_)
print("SC :", silhouette_score(X, y_pred))
```

## 本章小结

学习 KMeans 时，要真正理解：

- 它是无监督学习
- 它核心是“中心点 + 距离”
- 它需要指定 `K`
- 它常配合 SSE、SC、CH 和肘部法一起使用

