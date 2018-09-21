package com.yixin.star;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.yixin"})
@MapperScan("com.yixin.star.mapper")
public class StardApplication {

	public static void main(String[] args) {
		SpringApplication.run(StardApplication.class, args);
	}
}
