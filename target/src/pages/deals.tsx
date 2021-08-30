import moment from "moment";
import React, { useEffect, useState } from "react";
import DealCard, {
  DealCardProps,
} from "ui/components/DealComponents/DealCard/DealCard";

import dynamic from "next/dynamic";
import DealCardList from "ui/components/DealComponents/DealCard/DealCardList";
const DealPipeline = dynamic(
  import("ui/components/DealComponents/DealPipeline/DealPipeline")
);
function ScrumBoard() {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);
  return (
    <div className="pl-4 pr-4 pt-3">{winReady ? <DealPipeline /> : null}</div>
  );
}
export default ScrumBoard;

/* export default function DealPage() {
  return (
    <div>
      <DealColunm />
      <DealCard
        title="Privatização dos correios"
        companyName="coxinha"
        companyPicture={
          "https://i0.zi.org.tw/kocpc/2021/02/1613622663-c613247d3bbbd06adf918a93f4e5098f.jpg"
        }
        contactName="Willian Rodrigues"
        type="teste"
        budget={2457}
        startDate={moment().format("DD/MM/YYYY HH:MM")}
        tag={"hot"}
      />
      <DealCard
        title="Privatização dos correios"
        companyName="coxinha"
        companyPicture={
          "data:image/png;base64,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"
        }
        contactName="Willian Rodrigues"
        type="teste"
        budget={2457}
        startDate={moment().format("DD/MM/YYYY HH:MM")}
        tag={"cold"}
      />
      <DealCard
        title="Privatização dos correios"
        companyName="coxinha"
        companyPicture={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX/////uQEBpO/yUCJ/ugD//v////v//v7/twF/uQD///z8///a+v4ApO37//19uwD/8uzxc1P+6uL72tOawT7///HrTBd/tQDQ553/+Nf6vBn6uwAAnenD8Pr//+0And7K+P/rZEDc77rxTybzv67977coqOf1x0f/9771/uaZxj3/+f//8eP0/e7ig2Tyck3gdFycvU+syGP0TRf+6+jrSyn43s/c7r3uYj3sUx7148jzUhTe767WY0HbSzCFrADyxLvyubL/+MxAqdAcoM7Q7vvwwCztwhbgzlcfrOYAofoAntj2xkzg9/z77KzuvgBqZE3PAAAEfklEQVR4nO2ca1cURxCGe3ep6rWK7SXAiGJYxA2gDsToireY2ybEC4r//99YPeoGcvjgma5EGd8H9iwsZ+b0U9XdM3yYNwQAAAAAAAAAAAAAAAAAAIBLQAo1qarTydheSpGJKNi3C5q44lByMrVTCLtAdV3bUERCKB3VAqLCUtWaTFDIB7UOkpgb2RmjT9k4Dy5w+xKZoY3MZ5pG6xxZzax7zNGnaLGqWEoGZVM0j8nH0AplXilXXWxYPorZUqT9ALWZBAcrThyskEplp0yHh3ecOIxFs1SjqB78+J0P9+79tGaTlUJ16/5dLx5cjyWGweqtqzuzBYNZa/KhR2shkS3IWxtXlq74sD6x7aJgKdq1K6zuDJy4Ol0LShKDGY6XXBivVzbICEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjC8CsyXCo0zCEd+nBn9tSD6XR29CjEYIaPN8Zjn0e5zTBnBhQYRtaHTwZTF57Ojp4FYmbr4Xi8NHZhnatYEP4hFCpefTLzmaQ/myGTCIfnNkudsB6SVO0VSZlXf7nqwmAw/fVRVLU59fy3DS/uV6HEUHLsR/z9By/+WCGKti/cuebGY1uG7Ttos1QNtzigJNbAytahshZlriwQ5ihSkOajVvE65+Z4kGulIdmQbEA5c8UDmxOhpFg5I6q2c6gHMUb6kEoTUtKU6/6v1z8/fvpafNQES525Knz81U5mMyK0vx5a3VO0akcPUsrny6Nq0o8KCn+GfO3Rgi7mdBvh5DNLieocLiTpw49+OVGm2dowSS5468PPw5Uk5mS7jF1lnZKZcrGaLrbFtgXltOzFzeXadi7bUHk+v+7DfC6VFBhafVSW/9wbebC3vffXsWpNKrt/bzrx4uWkIkoFhnapWH7V9+H165Nj5VpSON0cDm940OvtT9jWdGtDbQz3+i49HPX721vJ7iKT7trYhj68ydlh7fdSyv9dmKEPo9H3W2ILm8Nu78aw58P+xG4j2t/TwBCGMIQhDGEIw2/BMHTesPs9hCEMYQhDGMIQht+CIe7aYAjDL2+IdQhDGMIQhjD8HLpu2P0ewvDyG2IdwhCGMIQhDD+Hrht2v4fdN8QshSEMYQhDGMIw03XD7vew+4aYpTCEIQxhCEMYwhCGl8Hwv7hrC1+VIQmrn2HfDIMQJzPseRpKwbPczM3T6j5+/dHJcUz5afXTTS/D4f4kh1m1NtScqfD2ZNuJ0clW4DomPn3xzilT4V2TqVCQiyGknLZuuqEcbZbSyvz2/LYPc6qkJNsk1rmNrY8/B1cxJCYSoVoKyn4Osr0ixva5GCnmcBTbb1xIgVLKiTci7BXNlHJETcFemrtvx2vyIOfuaF4zUYJqaOJzRC58u/jTC/6YVKr83trQhtKM5mNo06danclxCufinS5IfFoc1YQKpWwoVvWcDeRDJC1IFQQAAAAAAAAAAAAAAAAAAPgfeQ8yNYPMYDOrogAAAABJRU5ErkJggg=="
        }
        contactName="Willian Rodrigues"
        type="teste"
        budget={2457}
        startDate={moment().format("DD/MM/YYYY HH:MM")}
        tag={""}
      />
    </div>
  );
}
 */
