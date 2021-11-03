export const formatArray = (array: any[], format: string) => {
  switch (format) {
    case "Empresa":
      return formatToCompany(array);
    case "Vendedor":
      return formatToSealer(array);
  }
};

const formatToCompany = (array: any[]) => {
  const dataNames = [];
  const dataValues = { wonValue: [], lostValue: [], inProgressValue: [] };
  const dataLength = { won: [], lost: [], inProgress: [] };
  array.map((element) => {
    const verify = dataNames.find((c) => c === element.company.name);
    let won = 0;
    let lost = 0;
    let inProgress = 0;
    let wonValue = 0;
    let lostValue = 0;
    let inProgressValue = 0;
    if (!verify) {
      dataNames.push(element.company.name);
      array.map((deal) => {
        if (deal.company.name === element.company.name) {
          switch (deal.status) {
            case "WON":
              won += 1;
              wonValue += deal.value;
              break;
            case "LOST":
              lost += 1;
              lostValue += deal.value;

              break;
            case "INPROGRESS":
              inProgress += 1;
              inProgressValue += deal.value;

              break;
          }
        }
      });
      dataValues.wonValue.push(wonValue);
      dataValues.lostValue.push(lostValue);
      dataValues.inProgressValue.push(inProgressValue);
      dataLength.won.push(won);
      dataLength.lost.push(lost);
      dataLength.inProgress.push(inProgress);
    } else {
    }
  });
  return { dataNames, dataValues, dataLength };
};

const formatToSealer = (array: any[]) => {
  const dataNames = [];
  const dataValues = { wonValue: [], lostValue: [], inProgressValue: [] };
  const dataLength = { won: [], lost: [], inProgress: [] };
  array.map((element) => {
    const verify = dataNames.find((c) => c === element.company.name);
    let won = 0;
    let lost = 0;
    let inProgress = 0;
    let wonValue = 0;
    let lostValue = 0;
    let inProgressValue = 0;

    if (!verify) {
      dataNames.push(element.activity[0].createdBy.name);
      array.map((deal) => {
        if (
          deal.activity[0].createdBy.name === element.activity[0].createdBy.name
        ) {
          switch (deal.status) {
            case "WON":
              won += 1;
              wonValue += deal.value;
              break;
            case "LOST":
              lost += 1;
              lostValue += deal.value;

              break;
            case "INPROGRESS":
              inProgress += 1;
              inProgressValue += deal.value;

              break;
          }
        }
      });
      dataValues.wonValue.push(wonValue);
      dataValues.lostValue.push(lostValue);
      dataValues.inProgressValue.push(inProgressValue);
      dataLength.won.push(won);
      dataLength.lost.push(lost);
      dataLength.inProgress.push(inProgress);
    } else {
    }
  });
  return { dataNames, dataValues, dataLength };
};