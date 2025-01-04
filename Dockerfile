# Etapa de compilación
FROM eclipse-temurin:17-jdk AS builder 

WORKDIR /app

# Copiar todos los archivos
COPY . .

# Dar permisos de ejecución al script mvnw
RUN chmod +x ./mvnw

# Compilar el proyecto
RUN ./mvnw clean package -DskipTests

# Etapa de producción
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar el JAR compilado desde la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Exponer el puerto
EXPOSE 4444

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
