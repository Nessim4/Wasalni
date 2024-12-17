# My Spring Boot Application

This is a Spring Boot application that uses PostgreSQL as the backend database. 

## Project Structure

```
my-spring-boot-app
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── myapp
│   │   │               ├── MySpringBootApplication.java
│   │   │               ├── controller
│   │   │               │   └── MyController.java
│   │   │               ├── model
│   │   │               │   └── MyModel.java
│   │   │               ├── repository
│   │   │               │   └── MyRepository.java
│   │   │               └── service
│   │   │                   └── MyService.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── static
│   │           └── index.html
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── myapp
│                       └── MySpringBootApplicationTests.java
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-spring-boot-app
   ```

2. **Configure PostgreSQL:**
   - Ensure PostgreSQL is installed and running.
   - Create a database for the application.
   - Update the `src/main/resources/application.properties` file with your database connection details.

3. **Build the application:**
   ```
   ./mvnw clean install
   ```

4. **Run the application:**
   ```
   ./mvnw spring-boot:run
   ```

## Usage

- The application exposes RESTful endpoints through the `MyController` class.
- You can access the static HTML file at `http://localhost:8080/index.html`.

## Testing

- Unit tests are located in the `src/test/java/com/example/myapp` directory.
- Run tests using:
  ```
  ./mvnw test
  ```

## License

This project is licensed under the MIT License.