import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { topVideos } from "@/lib/dummyData";

interface Props {
  limit?: number;
}

export function TopVideosTable({ limit = 10 }: Props) {
  const data = topVideos.slice(0, limit);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">#</TableHead>
            <TableHead>Video</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Watch Time</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Avg Duration</TableHead>
            <TableHead className="text-right">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((v, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{v.thumbnail}</span>
                  <span className="font-medium text-sm max-w-[240px] truncate">{v.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{(v.views / 1000).toFixed(1)}K</TableCell>
              <TableCell className="text-right">{(v.watchTime / 60).toFixed(0)}h</TableCell>
              <TableCell className="text-right">{v.ctr}%</TableCell>
              <TableCell className="text-right">{v.avgDuration}</TableCell>
              <TableCell className="text-right text-muted-foreground">{v.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
