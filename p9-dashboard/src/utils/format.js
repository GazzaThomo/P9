export function transformMockData(dataType, data) {
  switch (dataType) {
    case "averageSession":
      return transformAverage(data);
    case "mainData":
      return transformMain(data);
    case "activity":
      return transformActivity(data);
    case "performance":
      return transformPerformance(data);
    default:
      return null;
  }
}

function transformActivity(data) {}
