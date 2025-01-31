import React from "react";
import Container from "./Container";

type Props = { toDay: string; temp: number };

function TodayData({ toDay, temp }: Props) {
  return (
    <div>
      <h2 className="flex gap-1 text-2xl items-end">
        <p>{toDay}</p>
      </h2>
      <Container className="gap-10 px-6">
        <div className="flex flex-col px-4">{temp}°</div>
      </Container>
    </div>
  );
}

export default TodayData;
