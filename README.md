| 请求类型 | 请求名称      | 请求参数                                                     | 调用的页面     | 返回值                                                       | 实体类     | 目的                  | 状态 |
| -------- | ------------- | ------------------------------------------------------------ | -------------- | :----------------------------------------------------------- | ---------- | --------------------- | ---- |
| post     | /login        | Usename  password                                            | Login.vue      | code&&msg&&user所有信息（localsotorage存起来 根据role_id分配页面） | User       |                       | done |
| post     | /publishEvent | event_name,event_descrip,candidate_grade,candidate_major,candidate_gender,private_key | BeginVote.vue  | code&&msg&&event所有信息                                     | Event      |                       | done |
| get      | /checkVoter   | username                                                     | Login.vue      | code&&msg                                                    | User-event |                       | done |
| post     | /vote         | vote event_id username.                                      | VoterIndex.vue | Code&&msg&&vote_result(true/false)                           | User-event |                       | done |
| post     | /uploadSurf   | surf_name,surf_descrip,event_id                              | playerindex    | Code&&msg                                                    | Surf       |                       | done |
| get      | /getSurf      | event_id                                                     | VoterIndex.vue | Code&&msg&&所有surf的相关信息&&User_id                       | Surf       |                       | done |
| get      | /checkResult  | event_id    all_username                                     |                | Code&&msg&&获胜surf的信息&&all_vote                          | Surf       |                       |      |
| get      | /checkVote    | username     可以直接调获取surf。解析出来的id发送给后端      |                | Code&&msg&&surf_list                                         | USer-event | 查看单个voter投票情况 |      |

查看自己投票的结果 可以直接把这个

User：

User_id Username  password  grade    major  role_id  reputation  (evented)

User-event:

Username  event-id  vote  flag(是否具有投票资格)

2         3        【0，1，0】 true

2。   4。      null  false

Event:

Event_id Event_name event-descrip  candidate_grade candidate_major candidate_gender private_key winner  number

2

Surf:

surf_id surf_name  surf_descrip  event_id

/login接口 传递用户名字和密码 然后根据每个user对应的 一个角色值来判断能不能登陆成功

/getVoter  获取所有voter信息 不需要获取orgnizer和player的信息

/publishEvent 选择所有符合条件的voter 并把他们的flag设置为true（是否有投票权限） 存储event对象在本地

/checkVoter 查看自己是否有资格参与投票

/uploadSurf  参赛者上传surf信息

/checkEvent

/getSurf  voter投票界面需要所有surf的相关信息

/checkResult 前端获取所有的交易信息，调取所有交易的vote信息，然后发送给后端  all_vote用密钥解密  通过all_username 查询每个username的reputation,然后用vote*对应的reputation，然后计算出最大的surf 并把它记录到event表中 以及返回到前端

/checkVote 发送own_vote 给后端解密得到[0,1,0,1] 得到id为1和4，然后从surf表中调用id为1，4的两个surf作为一个list返回给视图。

### ## 周会

1. Pallier 生成一对密钥，所有人的投票结果都用这对钥匙来加密解密？存储在本地的钥匙对指的是以太坊的那对钥匙对？ ***自动生成以太坊账号***

​            不解密去比较大小。

2. 其他event的时候他的flag是什么？一轮投票结束后设置部分为false。结束投票后要把flag重新设置为false。

3. 解密这个步骤直接在前端完成可以吗？前端解密？

4. 一个用户可能对应多个event？那表里存储多个event？一个event还要对应一个vote?再出一个表？

5. 密文上链还是哈嘻上链？存储到数据库

6. reputatiton链 设计的类似于转账 记账。
7. 结束投票 投票结束要有一个提示

8. 这个密钥如何传给后端？两个按钮，一个按钮部署合约，一个按钮发布event433

Flag 是string

vote的类型

ussername string
