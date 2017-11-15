# node 服务
npm install

# 服务开启
supervisor ./bin/www
pm2 start ./bin/www --watch --name admin


# 数据库配置目录
config/sql.js


# 服务端口
http://localhost:6002

说明 ：目前代码采用  linux环境下 node + mysql 实现
