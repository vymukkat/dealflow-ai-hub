import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { brand: "DraftKings", contact: "sponsorships@draftkings.com", subject: "The hockey audience...", sent: "3 days ago", status: "Sent", opens: "3 opens" },
  { brand: "Manscaped", contact: "pr@manscaped.com", subject: "Grooming + hockey...", sent: "1 week ago", status: "Sent", opens: "1 open" },
  { brand: "BetMGM", contact: "partnerships@betmgm.com", subject: "Hockey betting...", sent: "2 weeks ago", status: "Bounced", opens: "—" },
  { brand: "Gatorade", contact: "sponsorships@gatorade.com", subject: "Sports nutrition...", sent: "3 weeks ago", status: "Replied", opens: "2 opens" },
];

function statusBadge(s: string) {
  if (s === "Bounced") return "bg-red-500 hover:bg-red-500 text-white";
  if (s === "Replied") return "bg-green-500 hover:bg-green-500 text-white";
  return "bg-primary hover:bg-primary text-primary-foreground";
}

export default function Sent() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold">Sent Outreach</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Opens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.brand}>
              <TableCell className="font-semibold">{r.brand}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{r.contact}</TableCell>
              <TableCell className="text-muted-foreground">{r.subject}</TableCell>
              <TableCell className="text-muted-foreground">{r.sent}</TableCell>
              <TableCell>
                <Badge className={statusBadge(r.status)}>{r.status}{r.status === "Replied" ? " ✓" : ""}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{r.opens}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
