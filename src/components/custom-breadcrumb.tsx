import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface CustomBreadcrumbProps {
  rootStyle?: string;
  title: string;
  SeparatorStyle?: string;
}

export function CustomBreadcrumb({
  rootStyle,
  title,
  SeparatorStyle,
}: CustomBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={cn("text-2xl items-end", rootStyle)}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className={cn("[&>svg]:size-6", SeparatorStyle)} />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
