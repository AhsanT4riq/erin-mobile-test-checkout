import React, { FC } from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import FormHeading from './FormHeading';
import FormDescription from './FormDescription';

interface FormCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const FormCard: FC<FormCardProps> = ({ title, description, children }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        {title && <FormHeading title={title} />}
        {description && <FormDescription desc={description} />}
        {children}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionDescription: {
    marginBottom: 16,
    color: '#666',
  },
  input: {
    marginBottom: 12,
  },
});

export default FormCard;
