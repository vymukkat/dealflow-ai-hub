import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    title: "Prospecting", color: "bg-muted",
    cards: [
      { brand: "Spotify", category: "Music/Streaming", domain: "spotify.com", info: "Affinity 94%" },
      { brand: "NordVPN", category: "VPN/Privacy", domain: "nordvpn.com", info: "Affinity 88%" },
      { brand: "AG1", category: "Health/Nutrition", domain: "ag1.com", info: "Affinity 82%" },
    ],
  },
  {
    title: "Contacted", color: "bg-pastel-blue",
    cards: [
      { brand: "DraftKings", category: "Sports Betting", domain: "draftkings.com", info: "Sent 3 days ago" },
      { brand: "Manscaped", category: "Grooming", domain: "manscaped.com", info: "Sent 1 week ago" },
    ],
  },
  {
    title: "In Negotiation", color: "bg-pastel-green",
    cards: [
      { brand: "Ghost Energy", category: "Energy Drinks", domain: "ghostenergy.com", info: "$2,500 offer received", highlight: true },
    ],
  },
  {
    title: "Closed", color: "bg-pastel-purple",
    cards: [
      { brand: "Squarespace", category: "Website Builder", domain: "squarespace.com", info: "$1,800 · Integration · Mar 2026", closed: true },
    ],
  },
];

export default function Pipeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deal Pipeline</h1>
        <p className="text-muted-foreground">Track every brand relationship</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.title} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <Badge variant="secondary" className="text-xs">{col.cards.length}</Badge>
            </div>
            <div className="space-y-3">
              {col.cards.map((card) => (
                <Card key={card.brand} className={`${card.highlight ? "border-green-300 bg-green-50" : ""}`}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{card.brand}</p>
                    <p className="text-xs text-muted-foreground">{card.category}</p>
                    <p className="text-[11px] text-muted-foreground">{card.domain}</p>
                    <div className="mt-2">
                      {card.closed ? (
                        <Badge className="bg-green-500 hover:bg-green-500 text-white text-[10px]">{card.info}</Badge>
                      ) : (
                        <p className="text-xs text-muted-foreground">{card.info}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
