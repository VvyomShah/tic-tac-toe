// curl -X POST http://localhost:3000/auth/register \
// -H "Content-Type: application/json" \
// -d '{"username": "new_user", "password": "secure_password"}'

// curl -X POST http://localhost:3000/auth/login \
// -H "Content-Type: application/json" \
// -d '{"username": "user2", "password": "password"}'

// curl -X GET http://localhost:3000/game/start \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXdfdXNlciIsImlhdCI6MTcyODAwNTU4NSwiZXhwIjoxNzI4MDA5MTg1fQ.9asR88Ak1AwBRV-fcEdsJT3bOsmGPHIieuz2aTu1Cl0" \
// -H "Content-Type: application/json" 

// curl -X POST http://localhost:3000/game/move \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXdfdXNlciIsImlhdCI6MTcyODAwNTU4NSwiZXhwIjoxNzI4MDA5MTg1fQ.9asR88Ak1AwBRV-fcEdsJT3bOsmGPHIieuz2aTu1Cl0" \
// -d '{"gameId": 1, "position": "0,0", "playerMove": "X"}'

// curl -X GET http://localhost:3000/game/9 \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZXdfdXNlciIsImlhdCI6MTcyODAwNTU4NSwiZXhwIjoxNzI4MDA5MTg1fQ.9asR88Ak1AwBRV-fcEdsJT3bOsmGPHIieuz2aTu1Cl0"

// curl -X GET http://localhost:3000/games \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzI4MDI4ODg0LCJleHAiOjE3MjgwMzI0ODR9.k930e6picCE96dSG4yPFKCBu9wBgnC961r9puaGtODE"

// curl -X GET http://localhost:3000/record \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTcyODA1NzQ5MCwiZXhwIjoxNzI4MDYxMDkwfQ.BlNGrae_7bdztcZssZEh66nxegh6gl-JXWmwTebz3FI"