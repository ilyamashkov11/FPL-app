package com.fpl.app.rest;

import org.apache.commons.dbcp2.BasicDataSource;

public class ConnectionPoolManager {
    private static BasicDataSource dataSource;

    static {
        dataSource = new BasicDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/FPL-tables");
        dataSource.setUsername("root");
        dataSource.setPassword("Chelsea11");
        dataSource.setInitialSize(5); 
        dataSource.setMaxTotal(10);
    }

    public static BasicDataSource getDataSource() {
        return dataSource;
    }
}

