// 서울시 실시간 도시데이터 중계 기능.
// 인증키는 Netlify 설정의 SEOUL_KEY 값에서만 읽으며, 방문자 브라우저로는 보내지 않습니다.
const AREAS = new Set(["광화문·덕수궁","명동 관광특구","용산역","왕십리역","건대입구역","회기역","성신여대입구역","수유역","창동 신경제 중심지","연신내역","신촌·이대역","홍대 관광특구","오목교역·목동운동장","발산역","신도림역","가산디지털단지역","여의도","노량진","신림역","고속터미널역","강남역","잠실 관광특구","천호역"]);
export default async (req) => {
  const area = new URL(req.url).searchParams.get("area") || "";
  if (!AREAS.has(area)) return new Response(JSON.stringify({ error: "허용하지 않은 장소입니다" }), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  const key = process.env.SEOUL_KEY;
  if (!key) return new Response(JSON.stringify({ error: "SEOUL_KEY가 설정되지 않았습니다" }), { status: 500, headers: { "content-type": "application/json; charset=utf-8" } });
  const url = `http://openapi.seoul.go.kr:8088/${encodeURIComponent(key)}/json/citydata/1/5/${encodeURIComponent(area)}`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const body = await r.text();
    return new Response(body, { status: r.ok ? 200 : 502, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=120" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "서울시 서버에 연결하지 못했습니다" }), { status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
};
