# Bhagavad Gita Mentor

A full-stack web application that maps common life challenges to Bhagavad Gita teachings and generates quiz questions from the topics a user has explored.

## Tech Stack

- Frontend: Vanilla HTML, CSS, and JavaScript
- Backend: Java 17, Spring Boot 4.0.6, Spring Web, Spring Data JPA, Spring Security BCrypt, Spring Validation, Spring Actuator
- Database: MySQL 8
- Build: Maven

## KRISHNA AI - Divine Life Guidance System

The repository now also includes a premium Next.js application in `krishna-ai/`.

- Next.js 16, React 19, TypeScript
- Tailwind CSS, Framer Motion, lucide-react
- Secure API routes for Gita guidance, TTS, and talking-avatar provider integration
- Local Gita semantic matching dataset with unit tests
- Browser SpeechSynthesis, procedural OM/flute ambience, and animated avatar fallback when paid keys are not configured

Run the new app:

```bash
cd krishna-ai
npm install
npm run dev
npm run lint
npm test
npm run build
```

Environment:
- Copy `krishna-ai/.env.example` to `krishna-ai/.env.local`.
- Add `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` for premium generated voice.
- Or add `OPENAI_API_KEY` for OpenAI TTS.
- Add `DID_API_KEY` and `DID_SOURCE_URL` for provider-generated talking avatar video.
- Without paid keys, the app still works with browser TTS, procedural OM/flute ambience, and an animated speaking avatar.

## Project Structure

```text
database/schema.sql                         MySQL schema and seed data
backend/pom.xml                             Maven dependencies and build
backend/src/main/java/com/gitamentor        Spring Boot API
backend/src/main/resources/application.properties
frontend/html                               Static app pages
frontend/css/style.css                      Shared responsive design system
frontend/js                                Shared utilities and page scripts
krishna-ai                                  Next.js Krishna AI immersive app
.env.example                               Required local environment values
run.bat                                    Windows helper to build and run backend
```

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/register` | Create a user account |
| POST | `/login` | Sign in and return a local session payload |
| POST | `/mentor` | Match a user question to a Gita category and shloka |
| POST | `/save-unanswered` | Save a question for review |
| GET | `/quiz?userId=1` | Fetch quiz questions for a user |
| GET | `/actuator/health` | Backend health check |

## Environment Setup

Copy `.env.example` values into your local shell, IDE run configuration, or deployment environment.

Required values:

```properties
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=gita_mentor
MYSQL_USERNAME=root
MYSQL_PASSWORD=your-local-password
APP_CORS_ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,null
```

Do not commit real passwords or API keys. `application.properties` reads from environment variables and no longer stores database credentials.

## Database Setup

Run the schema once in MySQL:

```bash
mysql -u root -p < database/schema.sql
```

The seed inserts are idempotent for fresh installs. If you previously ran an older version of the script and see duplicate shlokas or quiz rows, recreate the local `gita_mentor` database and run the current script again.

Verify seed data:

```sql
USE gita_mentor;
SELECT COUNT(*) FROM shlokas;
SELECT COUNT(*) FROM quiz_questions;
```

## Run Locally

Backend:

```bash
cd backend
mvn clean package
java -jar target/gita-mentor-1.0.0.jar
```

Frontend:

```bash
cd frontend
python -m http.server 5500
```

Open:

```text
http://localhost:5500/html/login.html
```

If the backend is deployed somewhere other than `http://localhost:8080`, load a small script before `utils.js` that sets:

```js
window.GITA_MENTOR_API_BASE = 'https://your-api-domain.example.com';
```

See `frontend/js/config.example.js`.

## Quality Checks

```bash
cd backend
mvn test
mvn clean package
```

For frontend syntax checks:

```bash
node --check frontend/js/utils.js
node --check frontend/js/auth.js
node --check frontend/js/home.js
node --check frontend/js/mentor.js
node --check frontend/js/quiz.js
```

## Security Notes

- Passwords are stored with BCrypt hashes.
- Database credentials come from environment variables.
- CORS is restricted to configured origins.
- Backend request bodies use validation DTOs.
- API errors return safe messages without stack traces.
- Frontend renders API data with `textContent`, including quiz options, to reduce XSS risk.
- `sessionStorage` is used for a lightweight local session. Add server-side sessions or JWT before using this for real production accounts.
