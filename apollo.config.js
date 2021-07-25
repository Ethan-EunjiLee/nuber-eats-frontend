module.exports = {
  client: {
    include: ["./src/**.*.tsx"], //* src 폴더 내 모든 tsx 파일에서 apollo가 작동하도록
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:5000/graphql",
    },
  },
};

// * apollo는 내가 프론트에서 gql(tagName)을 이용할 때 마다 해당되는 typescript definition을 전달해준다.
/**
 * * Cdoegen을 사용하면 내가 백엔드에서 작성한 dto의 type을 연결해주는 interface가 만들어진다.
 * * 명령어: apollo client:codegen mytypes.d.ts --target=typescript
 * *                              ( mytypes: 여기에 인터페이스가 생성된다.)
 * * client의 url을 적어줬기 때문에 backend 에서 실제 작성한 dto 확인 가능
 */
