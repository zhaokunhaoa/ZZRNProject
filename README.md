# ZZRNProject


#### 步骤
    * npm install
    * npm install --save react-navigation


#### 端口8081 被占用情况处理
    * sudo lsof -i tcp:8081
        - ReactNati 53006 username   11u  IPv6 0xaedc0291******      0t0  TCP ------
    * kill 53006
