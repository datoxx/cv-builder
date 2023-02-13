
export type GenralInfoType = {
    name?: string;
    surname?: string;
    image?: string;
    about_me?: string;
    email?: string;
    phone_number?: string;
  };

export type EducationType = {
    institute?: String | undefined;
    degree_id ?: string | number;
    due_date?: string | undefined;
    description?: string | undefined;
}


export type ExperiencesType = {
    position?: string | undefined;
    employer?: string | undefined;
    description?: string | undefined;
    start_date?: string | undefined;
    due_date?: string | undefined;
}

export type FormValues = {
    experiences: ExperiencesType[];
    educations: EducationType[];
  };