export function setApiKey(key: string): void;

export function setConfig(config: {
  errorThreshold?: number;
  intervalMinutes?: number;
}): void;

export function alertOnError(
  errMsg: string,
  callMethod?: {
    alertMethods?: Array<"call" | "msg" | "mail">;
  },
): void;

