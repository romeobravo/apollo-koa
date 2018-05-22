# GraphQL Stack

# Set up
- Install up `curl -sf https://up.apex.sh/install | sh`
- Install prisma `npm i prisma -g`
- Set AWS credentials in .aws profile
- Set env vars `cp .env.example .env` & set prisma endpoint

# Run
- `npm run dev`

# Deploy
- Deploy prisma `npm run deploy:prisma`
- Deploy koa-server on lambda `npm run deploy:koa`
