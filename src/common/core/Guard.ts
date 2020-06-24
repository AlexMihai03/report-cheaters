
export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (const result of guardResults) {
      if (result.succeeded === false) {
        return result;
      }

      return { succeeded: true };
    }
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { succeeded: true };
    }
  }
}