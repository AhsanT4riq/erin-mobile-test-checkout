import React, { FC, Fragment } from 'react';
import { StyleSheet } from 'react-native';
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
          style={styles.input}
          placeholder="Enter your first name"
        />

        {/* Last Name */}
        <FormControlTextInput
          name="lastName"
          control={control}
          label="Last Name"
          mode="outlined"
          style={styles.input}
          placeholder="Enter your last name"
        />

        {/* Email */}
        <FormControlTextInput
          name="email"
          control={control}
          label="Email Address"
          mode="outlined"
          style={styles.input}
          placeholder="email@example.com"
          keyboardType="email-address"
        />

        {/* Phone */}
        <FormControlTextInput
          name="phone"
          control={control}
          label="Phone Number"
          mode="outlined"
          style={styles.input}
          placeholder="+1 (555) 123-4567"
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
          style={styles.input}
          placeholder="Company name"
        />

        {/* Special Instructions */}
        <FormControlTextInput
          name="specialInstructions"
          control={control}
          label="Special Instructions (Optional)"
          mode="outlined"
          style={styles.input}
          placeholder="Any special delivery instructions"
          multiline
          numberOfLines={4}
        />
      </FormCard>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
});

export default ContactInfoForm;
