export type FormValues = {
    experiences: {
        position?: string | undefined;
        employer?: string | undefined;
        description?: string | undefined;
        start_date?: string | undefined;
        due_date?: string | undefined;
    }[];
    educations: {
        institute?: String | undefined;
        degree_id ?: string | number;
        due_date?: string | undefined;
        description?: string | undefined;
    }[];
  };