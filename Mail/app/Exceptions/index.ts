type InternalException = {
  status: number;
  code: string | object;
  log?: string;
  isInternalException: boolean;
};

const generic = (status, code, log): InternalException => ({
  status,
  code,
  log,
  isInternalException: true,
});

export default {
  custom: (status: number, code: string, log?: string) =>
    generic(status, code, log),
};
