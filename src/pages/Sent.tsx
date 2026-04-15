import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { brand: "DraftKings", contact: "sponsorships@draftkings.com", subject: "The hockey audience...", sent: "3 days ago", status: "Sent", opens: "3 opens" },
  { brand: "Manscaped", contact: "pr@manscaped.com", subject: "Grooming + hockey...", sent: "1 week ago", status: "Sent", opens: "1 open" },
  { brand: "BetMGM", contact: "partnerships@betmgm.com", subject: "Hockey betting...", sent: "2 weeks ago", status: "Bounced", opens: "—" },
  { brand: "Gatorade", contact: "sponsorships@gatorade.com", subject: "Sports nutrition...", sent: "3 weeks ago", status: "Replied", opens: "2 opens" },
];

function statusBadgeClass(s: string) {
  if (s === "Bounced") return "bg-red-50 text-red-600 border-red-200";
  if (s === "Replied") return "bg-green-50 text-green-600 border-green-200";
  return "bg-blue-50 text-blue-600 border-blue-200";
}

export default function Sent() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-xl font-semibold text-foreground">Sent Outreach</h1>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
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
            <TableRow key={r.brand} className="hover:bg-secondary/50">
              <TableCell className="font-medium text-foreground">{r.brand}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{r.contact}</TableCell>
              <TableCell className="text-muted-foreground">{r.subject}</TableCell>
              <TableCell className="text-muted-foreground">{r.sent}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusBadgeClass(r.status)}>{r.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground tabular-nums">{r.opens}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
