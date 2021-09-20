# front-end 프로젝트 구축을 위해 사용한 것들

## Used Site

1. 코레일리 로고 (코레일 로고에서 저작권 문제로 변경)
2. https://pixabay.com/ (이미지)
3. https://color.adobe.com/ko/create/color-wheel (색조합)


## Main Used Library

1. typescript
2. create-react-app
3. react
4. redux
5. styled-components
6. material-ui
7. axios
8. socket.io-client


## Used Visual Studio Code Plugin

1. Prettier
2. Rainbow Brackets
3. ESLint (airbnb)
  * npm info "eslint-config-airbnb@latest" peerDependencies
  * npx install-peerdeps --dev eslint-config-airbnb
  * npm install --legacy-peer-deps

## 설정

src/helper/axiosHelper 에서 DOMAIN 변수 수정: api 서버 url

## 배포

```bash
npm run build
cd build
aws s3 cp SOURCE_DIR  s3://DEST_BUCKET// --recursive
aws s3 sync SOURCE_DIR s3://DEST_BUCKET/
```