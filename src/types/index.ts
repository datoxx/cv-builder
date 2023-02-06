export type FormValues = {
    experience: {
        position?: string | undefined;
        employer?: string | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }[];
    education: {
        school: String | undefined;
        degree?: string | undefined;
        endDate?: string | undefined;
        description?: string | undefined;
    }[];
  };