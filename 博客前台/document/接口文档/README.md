# 接口文档

# 接口规约

起始点：http://host:port/api/v1

起始点 + 类型 + 终结点 得出最终链接，如：http://host:port/api/v1/register/send-mail-verify 为发送邮箱验证码

**注意终结点为 ` ` 和终结点为 `/` 是两个路径** ，例如： http://host:port/api/v1/user 和 http://host:port/api/v1/user/ 分别代表两个不同的东西，不能视为同等请求。

## 数据类型模板

|  字段名   | 数据类型 | 默认值  |     说明     |
| :-------: | :------: | :-----: | :----------: |
|  `code`   |   int    |   200   |  响应状态码  |
| `message` |  string  | success |   响应信息   |
|  `data`   |  object  |  null   |   响应数据   |
| `status`  |   bool   |  true   | 操作是否成功 |

### `code `含义

| 取值范围  |      含义      |
| :-------: | :------------: |
| [200,299] |    请求成功    |
| [300,399] |    请求转发    |
| [400,499] | 用户级请求失败 |
| 401 |  未登录，请先登录  |
| 402 |  非法操作  |
| [500,599] | 系统级请求失败 |

用户级请求失败：由用户的操作造成，一般是操作被拒绝、跨权限访问或异常操作，比如注册账号时的用户名被占用或者是未经登录就调用修改信息的接口。此类请求一般可以直接将异常信息展示给用户。

系统级请求失败：由服务器异常造成，比如某段代码报错但未经正确处理。此类请求一般不将异常信息直接展示给用户。

## 请求方式说明

一般情况下，各接口的请求方式遵循以下表格：

| 请求方式 | 传参方式 |        含义        |
| :------: | :------: | :----------------: |
|   GET    |   url    |      获取资源      |
|   POST   | fromdata | 新建资源、发出动作 |
|   PUT    | fromdata |      更新资源      |
|  DELETE  | fromdata |      删除资源      |

# 注册相关 `/register`

## 发送邮箱验证码 `√`

**注册邮箱验证码有90s发送一次的限制**

终结点：`/send-mail-verify`

请求方式：`POST`

**参数**

| 字段名 | 数据类型 | 默认值 |   说明   |
| :----: | :------: | :----: | :------: |
| `mail` |  string  |   -    | 用户邮箱 |

**响应数据**

无

## 提交注册 `√`

终结点：`/register`

请求方式：`POST`

**参数**

|    字段名    | 数据类型 | 默认值 |    说明    |
| :----------: | :------: | :----: | :--------: |
|  `username`  |  string  |   -    |   用户名   |
|  `password`  |  string  |   -    |    密码    |
|    `mail`    |  string  |   -    |    邮箱    |
| `mailVerify` |  string  |   -    | 邮箱验证码 |
|   `mobile`   |  string  |   -    |   手机号   |

**响应数据**

无

# 登录相关 `/login`

## 用户登录 `√`

终结点：`/login`

请求方式：`POST`

**参数**

|   字段名   | 数据类型 | 默认值 |  说明  |
| :--------: | :------: | :----: | :----: |
| `username` |  string  |   -    | 用户名 |
| `password` |  string  |   -    |  密码  |

**响应数据**

|     字段名     | 数据类型 |   说明   |
| :------------: | :------: | :------: |
|   `username`   |  string  |  用户名  |
|   `nickname`   |  string  |   昵称   |
|  `avatarUrl`   |  string  | 头像链接 |
| `registerTime` | datatime | 注册时间 |

## 用户登出 `√`

终结点：`/logout`

请求方式：`GET`

**参数**

无

**响应数据**

无

# 用户信息相关`/user`

==**注意：此类型下所有方法均需要登录后才可以成功调用，除非有特殊说明**==

## 获取公开信息 `√`

**该接口无需登录，可以获取任意用户的信息，如果只需要获取当前用户的信息，请不要传参数**

终结点：` `

请求方式：`GET`

**参数**

|   字段名   | 数据类型 |     默认值     |  说明  |
| :--------: | :------: | :------------: | :----: |
| `username` |  string  | 当前登录用户名 | 用户名 |

**响应数据**

|     字段名     | 数据类型 |   说明   |
| :------------: | :------: | :------: |
|   `username`   |  string  |  用户名  |
|   `nickname`   |  string  |   昵称   |
|  `avatarUrl`   | datatime | 头像链接 |
| `registerTime` | datatime | 注册时间 |

## 修改昵称 `√`

终结点：`/nickname`

请求方式：`PUT`

**参数**

|   字段名   | 数据类型 | 默认值 |   说明   |
| :--------: | :------: | :----: | :------: |
| `nickname` |  string  |   -    | 用户昵称 |

**响应数据**

无

## 修改头像 `√`

**上传的文件请小于1Mib，支持的格式：png、jpg、jpeg**

终结点：`/avatar`

请求方式：`PUT`

**参数**

|    字段名    | 数据类型 | 默认值 |   说明   |
| :----------: | :------: | :----: | :------: |
| `avatarFile` |   file   |   -    | 用户头像 |

**响应数据**

无

## 修改密码 `√`

终结点：`/password`

请求方式：`PUT`

**参数**

|    字段名     | 数据类型 | 默认值 |  说明  |
| :-----------: | :------: | :----: | :----: |
| `oldPassword` |  string  |   -    | 旧密码 |
| `newPassword` |  string  |   -    | 新密码 |

**响应数据**

无

## 修改邮箱 `√`

**修改邮箱前需要先发送邮箱验证码**

终结点：`/mail`

请求方式：`PUT`

**参数**

|    字段名    | 数据类型 | 默认值 |    说明    |
| :----------: | :------: | :----: | :--------: |
|    `mail`    |  string  |   -    |   新邮箱   |
| `mailVerify` |  string  |   -    | 邮箱验证码 |

**响应数据**

无

## 发送邮箱验证码 `√`

**该邮箱验证码有60s内只能发送一次的限制**

终结点：`/mail/send-mail-verify`

请求方式：`POST`

**参数**

无

**响应数据**

无

## 获取基本信息

## 修改基本信息

## 获取教育信息

## 修改教育信息

## 删除用户 `√`

终结点：`/user`

请求方式：`DELETE`

**参数**

|   字段名   | 数据类型 | 默认值 |  说明   |
| :--------: | :------: | :----: |:-----:|
| `password` |  string  |   -    |  密码   |

**响应数据**

无

# 关注和粉丝

## 获取关注列表

### 请求信息

#### 请求地址

```
/user/follow?page=98
```

#### 请求方法

```
GET
```

#### 入参字段说明

| **字段** | **类型** | **必填** | **含义** | **其他参考信息** |
| -------- | -------- | -------- | -------- | ---------------- |
| page     | **int**  | 否       | 当前页   |                  |

### 出参

#### 出参示例

```json
{
  "code": 110,
  "message": "响应信息36",
  "data": {
    "records": [
      {
        "id": 28,
        "userId": 90,
        "followId": 4,
        "note": "备注21",
        "status": 59,
        "createTime": {
          "nanos": 60
        },
        "username": "关注者用户名52",
        "nickname": "关注者昵称62",
        "avatarUrl": "关注者头像链接114",
        "registerTime": {}
      },
      {
        "id": 28,
        "userId": 90,
        "followId": 4,
        "note": "备注21",
        "status": 59,
        "createTime": {
          "nanos": 60
        },
        "username": "关注者用户名52",
        "nickname": "关注者昵称62",
        "avatarUrl": "关注者头像链接114",
        "registerTime": {}
      }
    ],
    "total": 920,
    "size": 538,
    "current": 298
  },
  "status": true
}
```

#### 出参字段说明

| **字段**                               | **类型**                  | **含义**               | **其他参考信息** | 
| -------------------------------------------------------- |------------------------- | ------------------------------------- | --------------- | | code 
| **Integer**               | 状态码 | | | message | **String**                | 响应信息 | | | data | **
ListVO\<FollowBasic\>** | 响应数据 | | | └─ records | **
List\<FollowBasic\>**   | 查询数据列表 | | | &ensp;&ensp;&ensp;&ensp;└─ id | **
Integer**               | id | | | &ensp;&ensp;&ensp;&ensp;└─ userId | **
Integer**               | 用户id | | | &ensp;&ensp;&ensp;&ensp;└─ followId | **
Integer**               | 关注者id | | | &ensp;&ensp;&ensp;&ensp;└─ note | **
String**                | 备注 | | | &ensp;&ensp;&ensp;&ensp;└─ status | **
Integer**               | 关注状态码 | | | &ensp;&ensp;&ensp;&ensp;└─ createTime | **
Timestamp**             | 创建时间 | | | &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;└─ nanos | **
int**                   | | | | &ensp;&ensp;&ensp;&ensp;└─ username | **
String**                | 关注者用户名 | | | &ensp;&ensp;&ensp;&ensp;└─ nickname | **
String**                | 关注者昵称 | | | &ensp;&ensp;&ensp;&ensp;└─ avatarUrl | **
String**                | 关注者头像链接 | | | &ensp;&ensp;&ensp;&ensp;└─ registerTime | **
Timestamp**             | 关注者注册时间 | | | └─ total | **
long**                  | 总数 | | | └─ size | **
long**                  | 每页显示条数，默认 20 | | | └─ current | **
long**                  | 当前页 | | | status | **
Boolean**               | 请求状态，操作成功为true，否则为false | |

## 获取粉丝列表

### 请求信息

#### 请求地址

```
/user/fans?page=68
```

#### 请求方法

```
GET
```

#### 入参字段说明

| **字段** | **类型** | **必填** | **含义** | **其他参考信息** |
| -------- | -------- | -------- | -------- | ---------------- |
| page     | **int**  | 否       | 当前页   |                  |

### 出参

#### 出参示例

```json
{
  "code": 87,
  "message": "响应信息92",
  "data": {
    "records": [
      {
        "id": 40,
        "userId": 13,
        "fansId": 112,
        "note": "备注85",
        "status": 111,
        "createTime": {
          "nanos": 74
        },
        "username": "粉丝用户名6",
        "nickname": "粉丝昵称71",
        "avatarUrl": "粉丝头像链接100",
        "registerTime": {}
      },
      {
        "id": 40,
        "userId": 13,
        "fansId": 112,
        "note": "备注85",
        "status": 111,
        "createTime": {
          "nanos": 74
        },
        "username": "粉丝用户名6",
        "nickname": "粉丝昵称71",
        "avatarUrl": "粉丝头像链接100",
        "registerTime": {}
      }
    ],
    "total": 396,
    "size": 306,
    "current": 30
  },
  "status": true
}
```

#### 出参字段说明

| **字段**                                                 | **类型**                | **
含义**                              | **其他参考信息** | | -------------------------------------------------------- |
----------------------- | ------------------------------------- | ---------------- | | code | **
Integer**             | 状态码 | | | message | **
String**              | 响应信息 | | | data | **
ListVO\<FansBasic\>** | 响应数据 | | | └─ records | **
List\<FansBasic\>**   | 查询数据列表 | | | &ensp;&ensp;&ensp;&ensp;└─ id | **
Integer**             | id | | | &ensp;&ensp;&ensp;&ensp;└─ userId | **
Integer**             | 用户id | | | &ensp;&ensp;&ensp;&ensp;└─ fansId | **
Integer**             | 粉丝id | | | &ensp;&ensp;&ensp;&ensp;└─ note | **
String**              | 备注 | | | &ensp;&ensp;&ensp;&ensp;└─ status | **
Integer**             | 状态码 | | | &ensp;&ensp;&ensp;&ensp;└─ createTime | **
Timestamp**           | 创建时间 | | | &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;└─ nanos | **
int**                 | | | | &ensp;&ensp;&ensp;&ensp;└─ username | **
String**              | 粉丝用户名 | | | &ensp;&ensp;&ensp;&ensp;└─ nickname | **
String**              | 粉丝昵称 | | | &ensp;&ensp;&ensp;&ensp;└─ avatarUrl | **
String**              | 粉丝头像链接 | | | &ensp;&ensp;&ensp;&ensp;└─ registerTime | **
Timestamp**           | 粉丝注册时间 | | | └─ total | **
long**                | 总数 | | | └─ size | **
long**                | 每页显示条数，默认 20 | | | └─ current | **
long**                | 当前页 | | | status | **
Boolean**             | 请求状态，操作成功为true，否则为false | |

## 关注其他用户

### 请求信息

#### 请求地址

```
/user/follow
```

#### 请求方法

```
POST
```

#### 请求体类型

```
application/x-www-form-urlencoded
```

#### 入参字段说明

| **字段** | **类型**    | **必填** | **含义**       | **其他参考信息** |
| -------- | ----------- | -------- | -------------- | ---------------- |
| followId | **Integer** | 否       | 被关注的用户id |                  |

### 出参

#### 出参示例

```json
{
  "code": 36,
  "message": "响应信息20",
  "data": {},
  "status": false
}
```

#### 出参字段说明

| **字段** | **类型**    | **含义**                              | **其他参考信息** |
| -------- | ----------- | ------------------------------------- | ---------------- |
| code     | **Integer** | 状态码                                |                  |
| message  | **String**  | 响应信息                              |                  |
| data     | **Object**  | 响应数据                              |                  |
| status   | **Boolean** | 请求状态，操作成功为true，否则为false |                  |

# 浏览博客相关`/blog`

**该部分功能主要是浏览博客之类的，除非有特殊说明，否则默认无需登录即可访问**

## 获取推荐博客列表 `√`

**持续获取会不断得到新的内容**

终结点：`/list`

请求方式：`GET`

**参数**

无

**响应数据**

|          字段名          | 数据类型 |     说明     |
| :----------------------: | :------: | :----------: |
|      `blogList`      |   List[Blog]    |    博客列表    |

Blog数据结构参见：**博客控制台 -> 获取博客列表 -> Blog**

## 搜索博客 `√`

**持续获取会不断得到新的内容**

终结点：`/search`

请求方式：`GET`

**参数**

| 字段名 | 数据类型 | 默认值 |   说明   |
| :----: | :------: | :----: | :------: |
| `key`  |  string  |  null  | 搜索内容 |

**响应数据**

|   字段名   |  数据类型  |      说明      |
| :--------: | :--------: | :------------: |
| `blogList` | List[Blog] |  博客信息列表  |
|   `page`   |    int     |     当前页     |
| `pageSize` |    int     |     页大小     |
|  `total`   |    int     |    博客总数    |

## 获取博客内容 `√`

终结点：`/blog`

请求方式：`GET`

**参数**

| 字段名 | 数据类型 | 默认值 |  说明  |
| :----: | :------: | :----: | :----: |
|  `id`  |   int    |   -    | 博客id |

**响应数据**

|   字段名   |  数据类型  |      说明      |
| :--------: | :--------: | :------------: |
|   `info`   |    Blog     |    博客信息    |
| `content` |  BlogContent    |    博客内容    |

Blog数据结构参见：**博客控制台 -> 获取博客列表 -> Blog**

**BlogContent：**

|   字段名   | 数据类型 |     说明     |
| :--------: | :------: | :----------: |
|  `blogId`  |   int    |   博客id   |
| `content` |   string   |  博客内容  |
| `modifiedTime` |   DataTime   |  修改时间   |

# 博客控制台`/blog-console`

**类似于CSDN创作中心，该分类下的api都需要用户登录后才可以调用**

## 获取创作信息

终结点：`/blog-statistics-data`

请求方式：`GET`

**参数**

无

**响应数据**

|          字段名          | 数据类型 |     说明     |
| :----------------------: | :------: | :----------: |
|      `allFansCount`      |   int    |    粉丝数    |
|    `allFavoriteCount`    |   int    |    收藏数    |
|      `allViewCount`      |   int    |   总阅读量   |
|   `yesterdayFansCount`   |   int    | 昨日新增粉丝 |
| `yesterdayFavoriteCount` |   int    | 昨天新增收藏 |
|   `yesterdayViewCount`   |   int    |  昨日阅读量  |

## 获取博客列表 `√`

终结点：`/blog-list`

请求方式：`GET`

**参数**

|    字段名    | 数据类型 | 默认值 |    说明    |
| :----------: | :------: | :----: | :--------: |
|    `page`    |   int    |   1    |   当前页   |
|  `pageSize`  |   int    |   20   |   页大小   |
|   `status`   |   int    |   0    | 博客状态码 |
| `sortStatus` |   int    |   0    | 排序状态码 |
|              |          |        |            |

博客状态码参见：**状态码说明** -> **博客状态码**

**响应数据**

|   字段名   |  数据类型  |      说明      |
| :--------: | :--------: | :------------: |
|  `count`   | BlogCount  | 各状态博客数量 |
| `blogList` | List[Blog] |  博客信息列表  |
|   `page`   |    int     |     当前页     |
| `pageSize` |    int     |     页大小     |
|  `total`   |    int     |    博客总数    |

**BlogCount：**

存放各状态的博客数量

|   字段名   | 数据类型 |     说明     |
| :--------: | :------: | :----------: |
|    `all`  |   int    |   博客总数，全部博客   |
| `publish` |   int    | 公开博客总数 |
|   `draft`   |   int    |   未发表的（草稿箱）   |
|   `personal`   |   int    |   私有的，仅自己可见   |
|   `deleted`   |   int    |   被删除的（回收站里的）   |
|   `audit`   |   int    |  审核中的   |

**Blog：**

|   字段名   |  数据类型  |      说明      |
| :--------: | :--------: | :------------: |
|   `id`    | int | 博客id |
|   `author`   | string |  作者用户名  |
|   `title`   |  string |     标题     |
| `description` |  string |     描述     |
| `coverImage` |  string |     封面图     |
| `createTime` | datatime |    创建时间    |
|   `releaseTime`   | datatime |  发表时间  |
|   `modifiedTime`   | datatime |     修改时间     |
| `status` |    int     |     博客状态码     |
| `viewNum` |    int     |     浏览量     |
| `likeNum` |    int     |     点赞量     |
| `commentNum` |    int     |     评论量     |
| `collectionNum` |    int     |     收藏量     |
| `score` |    int     |     评分     |

## 新建/保存博客 `√`

若填写id则为保存博客，若不填写id则为新建博客。

封面图的代码后端还没写好，上传之后还不能保存。

终结点：`/blog`

请求方式：`POST`

**参数**

|    字段名     | 数据类型 | 默认值 |     说明      |
| :-----------: | :------: | :----: |:-----------:|
|     `id`      |  string  |   -    | 博客id(若无则不填) |
|    `title`    |  string  |   -    |     标题      |
| `description` |  string  |   -    |     描述      |
| `coverImage`  |  file  |   null    |     封面图      |
|   `content`   |  string  |   -    |  内容(md格式)   |
|   `status`    |  int  |   -    |    博客状态码    |

博客状态码参见：**状态码说明** -> **博客状态码**

**响应数据**

无

## 删除博客 `√`

**将博客放入回收站**

终结点：`/blog`

请求方式：`DELETE`

**参数**

| 字段名 | 数据类型 | 默认值 |  说明  |
| :----: | :------: | :----: | :----: |
|  `id`  |   int    |   -    | 博客id |

**响应数据**

无

## 彻底删除博客 `√`

**只有回收站中的博客可以被彻底删除**

终结点：`/blog/delete`

请求方式：`DELETE`

**参数**

| 字段名 | 数据类型 | 默认值 |  说明  |
| :----: | :------: | :----: | :----: |
|  `id`  |   int    |   -    | 博客id |

**响应数据**

无

# 评论相关

# 状态码说明

## 博客状态码

| 状态码 |  对应字段  |    说明    |
| :----: | :--------: | :--------: |
|   0    |   `all`    |  所有博客  |
|   1    | `publish`  |    公开    |
|   2    |  `draft`   |   未发表   |
|   3    | `personal` | 仅自己可见 |
|   4    | `deleted`  |   回收站   |
|   5    |  `audit`   |   审核中   |

## 排序状态码

**x0表示升序，x1表示降序**

|       状态码    |          对应字段            |            说 明        |
| :------------:|  :------------------------: | :---------------------:|
|         0      |            `all`            |          不进行排序     |
|         10     |          `releaseTime`      |       按照发布时间来排序  |
|       20       |           `viewNum`         |       按照浏览量来排序   |

