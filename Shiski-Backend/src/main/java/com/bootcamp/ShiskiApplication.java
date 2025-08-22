package com.bootcamp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShiskiApplication {

	public static void main(String[] args) {
		// Carga variables de entorno desde .env
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		System.setProperty("DB_URL_PG", dotenv.get("DB_URL_PG", ""));
		System.setProperty("DB_USERNAME_PG", dotenv.get("DB_USERNAME_PG", ""));
		System.setProperty("DB_PASSWORD_PG", dotenv.get("DB_PASSWORD_PG", ""));

		System.setProperty("DB_URL", dotenv.get("DB_URL", ""));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME", ""));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD", ""));

		System.setProperty("IP_BACKEND", dotenv.get("IP_BACKEND", ""));
		System.setProperty("IP_FRONTEND", dotenv.get("IP_FRONTEND", ""));
		System.setProperty("IP_LOCAL", dotenv.get("IP_LOCAL", ""));

		SpringApplication.run(ShiskiApplication.class, args);
	}
}
