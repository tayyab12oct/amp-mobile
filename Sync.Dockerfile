FROM 540455772678.dkr.ecr.ap-south-1.amazonaws.com/ottplay-web-ssr:latest as deps

FROM 540455772678.dkr.ecr.ap-south-1.amazonaws.com/ottplay-web-base:latest 
ARG env
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ENV stg=$env
ENV path=s3://ottwatch-images/cdn/$stg
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
WORKDIR /app
COPY --from=deps /usr/src/app/.next/static ./build
CMD ["s3", "sync", "./build", "s3://ottwatch-images/cdn/staging/_next/static"]
