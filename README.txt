서울 도로·화재 안전상황판 — 공식 사이트 배포 안내

1. GitHub에 새 저장소를 만들고 이 폴더의 site, netlify 폴더와 netlify.toml을 올립니다.
2. Netlify → Add new site → Import an existing project → GitHub → 저장소 선택 → Deploy.
3. Site configuration → Environment variables → Add variable
     Key   : SEOUL_KEY
     Value : 서울 열린데이터광장에서 받은 인증키
   저장한 뒤 Deploys → Trigger deploy를 누릅니다.
4. 사이트 상단 상태 표시가 "실시간 수신 중 · 23/23곳"으로 바뀌면 완료입니다.

인증키는 GitHub 파일에 적지 마세요. 저장소가 공개되면 키도 공개됩니다.
