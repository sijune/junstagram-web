# Junstagram

Instagram Clone Frontend with ReactJS

---

## [React Hook]

- useEffect

  - hook을 이용하여 컴포넌트가 마운트, 언마운트, 데이터가 업데이트 되었을 때 특정작업을 처리

    ```js
    ...

    useEffect(() => {
        if (data?.me === null) {
        logUserOut();
        }
    }, [data]);

    ...
    }
    ```

- useQuery & useMutation

  - apollo client 에서 사용하는 Hook
  - hook을 사용하여 query와 mutation을 서버로 보내고 리턴값을 쉽게 받아 처리할 수 있다.

    ```js
    //useUser 커스텀 Hook 생성 시 사용한 useQuery예시

    const ME_QUERY = gql`
      query me {
        me {
          username
          avatar
        }
      }
    `;

    function useUser() {
      const hasToken = useReactiveVar(isLoggedInVar);
      //localStorage에 토큰이 있는지 여부만 체크
      const { data, error } = useQuery(ME_QUERY, {
        //실제 토큰을 던져서 유저 확인, localStorage에 없다면 스킵!
        skip: !hasToken,
      });

      // hook을 이용하여 컴포넌트가 마운트, 언마운트, 데이터가 업데이트 되었을 때 특정작업을 처리
      useEffect(() => {
        if (data?.me === null) {
          logUserOut();
        }
      }, [data]);
      return { data };
    }

    export default useUser;
    ```

- useReactiveVar

  - apollo client 3에서 제안된 신규 개념
  - apollo client cache가 아닌 local state를 저장하기 위한 개념
  - login check 시 전역으로 사용

    ```js
    //makeVar를 사용하여 전역으로 사용할 변수 선언
    export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

    //useReactiveVar를 사용하여 저장된 전역 상태값을 가져온다.
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    ```
