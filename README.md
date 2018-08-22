# API thing
- Purpose:
  - Authentication with jwt
- Secondary:
  - CRUD with news (UD eventually)V

# Make it work
- `.env` with
  ```
  MONGODB_URI=dbthing
  SECRET_JWT_KEY="your-secret-thing"
  SECRET_SESSION_KEY="your-secret-thing"
  SECRET_PASSWORD="your-password-thing" <- for the seed file
  CLIENT_URL=http://yourclient.url
  ```
- from vscode
  - F5
- from non-vscode
  - `npm run dev`

# Seed the db
- `npm run seed`

# Routes
- WIP 👀