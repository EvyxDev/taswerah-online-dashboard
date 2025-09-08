"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function MediaGallery({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: Photo[];
  emptyText?: string;
}) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-homenaje rtl:font-almarai">{title}</h3>
        <div className="text-sm text-muted-foreground">
          {items.length} items
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          {emptyText || "No items"}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border bg-background"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.photo}
                  alt={item.name || "media"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
