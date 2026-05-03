@echo off
chcp 65001 >NUL
setlocal

echo Starting Gita Mentor backend...
cd /d "%~dp0backend"

echo Building and running tests...
mvn clean package
if errorlevel 1 (
  echo Build failed. Fix the error above and run again.
  exit /b 1
)

echo Launching application on http://localhost:8080
java -jar target\gita-mentor-1.0.0.jar
