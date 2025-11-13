import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * 강사회원 - 강의 등록 버튼
 */
export function AddBtn() {
  const router = useRouter();
  /** 클릭 핸들러 */
  const handleBtnClick = () => {
    router.push("/class/open");
  };

  return (
    <Button variant="outline" onClick={handleBtnClick}>
      강의등록
    </Button>
  );
}
