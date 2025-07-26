import Image from "next/image";
import { useTranslations } from "next-intl";

interface CardProps {
  title: string;
  value: string | number;
  unit?: string;
  iconSrc: string;
}

const Card = ({ title, value, unit, iconSrc }: CardProps) => {
  return (
    <div className="bg-white flex flex-col justify-between shadow-md border-black border-[12px] p-4  2xl:p-6 rounded-3xl h-40 sm:h-44 md:h-48 lg:h-40 2xl:h-48">
      <div className="2xl:mb-2">
        <Image
          src={iconSrc}
          alt="icon"
          width={50}
          height={50}
          className="w-10 sm:w-12 lg:w-10 2xl:w-14 h-auto"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <h6 className="text-main-black font-homenaje text-xl lg:text-xl 2xl:text-2xl">
          {title}
        </h6>
        <p className="text-main-black font-homenaje text-2xl sm:text-3xl md:text-base 2xl:text-4xl">
          {value} {unit && unit}
        </p>
      </div>
    </div>
  );
};

export default function CardSection({ summary }: { summary: Summary }) {
  const t = useTranslations();
  if (!summary) {
    return;
  }
  const cardData = [
    {
      title: t("dashboard.totalSales"),
      value: parseFloat(summary.total_sales).toFixed(0),
      unit: t("dashboard.egp"),
      iconSrc: "/assets/dash-board-1.svg",
    },
    {
      title: t("dashboard.clients"),
      value: summary.total_clients,
      iconSrc: "/assets/dash-board-2.svg",
    },
    {
      title: t("dashboard.printedPhotos"),
      value: summary.printed_photos,
      iconSrc: "/assets/dash-board-3.svg",
    },
    {
      title: t("dashboard.activeBooths"),
      value: summary.active_booths,
      iconSrc: "/assets/dash-board-4.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          value={card.value}
          unit={card.unit}
          iconSrc={card.iconSrc}
        />
      ))}
    </div>
  );
}
