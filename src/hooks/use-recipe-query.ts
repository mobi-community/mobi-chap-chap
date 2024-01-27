import { useInfiniteQuery, useQuery } from "react-query";
import { getDetailRecipe, getRecipe } from "../apis/recipe.api";
import { QUERY_KEY } from "../consts/query-key";

/**
 * @function useGetRecipeInfinity 는 recipe data를 가져와 무한 스크롤을 구현해주는 hook 함수
 * @param {recipeData} : 매개변수로 받은 데이터들을 스프레드 형태로 보관, api 주소에 저장
 * @param {fetchNextPage} : useInfiniteQuery의 options 중 하나
 * @return {recipeData, fetchNextPage}
 **/

export function useGetRecipeInfinity() {
  const {
    data: recipeData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.MORE_RECIPE_LIST],
    queryFn: ({ pageParam = { startIdx: 1, endIdx: 12 } }) =>
      getRecipe(pageParam),
    getNextPageParam: (lastPage, totalPages) => {
      const startIdx = totalPages.length * 12 + 1;
      let endIdx = (totalPages.length + 1) * 12;

      if (lastPage.COOKRCP01.total_count < endIdx) {
        endIdx = lastPage.COOKRCP01.total_count;
      }
      if (startIdx > lastPage.COOKRCP01.total_count) {
        return null;
      }
      return { startIdx, endIdx };
    },
  });
  return { recipeData, fetchNextPage, hasNextPage, isFetching };
}

/**
 * @function useGetDetailRecipe 는 특정 레시피의 상세 정보를 가져오는 함수
 * @param {...recipeKey} 매개변수로 받은 데이터들을 스프레드 형태로 보관, api 주소에 저장
 * @returns {recipeDetail, isSuccess}
 */
export function useGetDetailRecipe({
  ...recipeKey
}: {
  startIdx: number;
  endIdx: number;
  RCP_NM: string;
}) {
  const { data: recipeDetail, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.DETAIL_RECIPE_DATA],
    queryFn: () => getDetailRecipe({ ...recipeKey }),
  });

  return { recipeDetail, isSuccess };
}