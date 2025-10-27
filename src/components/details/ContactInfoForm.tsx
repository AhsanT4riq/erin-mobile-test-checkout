import React, { FC, Fragment } from 'react';
import FormCard from '../form/FormCard';
import FormControlTextInput from '../form/FormControlTextInput';
import { Control } from 'react-hook-form';
import { DetailsFormData } from '../../schema/detailsSchema';

interface ContactInfoProps {
  control: Control<DetailsFormData>;
}

const ContactInfoForm: FC<ContactInfoProps> = ({ control }) => {
  return (
    <Fragment>
      <FormCard description="Please provide your contact information for order updates and delivery.">
        {/* First Name */}
        <FormControlTextInput
          name="firstName"
          control={control}
          label="First Name"
          mode="outlined"
          placeholder="Enter your first name"
        />

        {/* Last Name */}
        <FormControlTextInput
          name="lastName"
          control={control}
          label="Last Name"
          mode="outlined"
          placeholder="Enter your last name"
        />

        {/* Email */}
        <FormControlTextInput
          name="email"
          control={control}
          label="Email Address"
          mode="outlined"
          placeholder="email@example.com"
          keyboardType="email-address"
        />

        {/* Phone */}
        <FormControlTextInput
          name="phone"
          control={control}
          label="Phone Number"
          mode="outlined"
          placeholder="0452525252"
          keyboardType="phone-pad"
        />
      </FormCard>
      <FormCard title="Additional Information">
        {/* Company (Optional) */}
        <FormControlTextInput
          name="company"
          control={control}
          label="Company (Optional)"
          mode="outlined"
          placeholder="Company name"
        />

        {/* Special Instructions */}
        <FormControlTextInput
          name="specialInstructions"
          control={control}
          label="Special Instructions (Optional)"
          mode="outlined"
          placeholder="Any special delivery instructions"
          multiline
          numberOfLines={4}
        />
      </FormCard>
    </Fragment>
  );
};

export default ContactInfoForm;
