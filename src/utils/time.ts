export const blockOf24H = 43200;

export function convertDate(milliSecond:number|string) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const data = new Date(milliSecond);  //Date객체 생성
  
    const year = data.getFullYear();    //0000년 가져오기
    const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
    const date = data.getDate();        //일자 가져오기
    const day = days[data.getDay()];    //요일 가져오기
    const hours = ('0' + data.getHours()).slice(-2); 
    const minutes = ('0' + data.getMinutes()).slice(-2);
    return `${year}.${month}.${date}. ${hours}시 ${minutes}분 (${day})`;
  }