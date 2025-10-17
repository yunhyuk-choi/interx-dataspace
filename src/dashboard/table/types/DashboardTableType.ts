
type DataType = "support" | "screen-call" | "first-interview" | "coding-test" | "second-interview" | "salary-negotiation" | "passed";

export interface DashboardTableType {
  title: string;
  dataType: DataType;
}