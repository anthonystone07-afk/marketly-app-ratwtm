
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function AddCampaignScreen() {
  console.log("Add campaign screen loaded");

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    type: 'social',
    budget: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Cancel pressed");
        router.back();
      }}
      style={styles.headerButton}
    >
      <Text style={styles.cancelText}>Cancel</Text>
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Save campaign:", formData);
        router.back();
      }}
      style={styles.headerButton}
    >
      <Text style={styles.saveText}>Save</Text>
    </Pressable>
  );

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const campaignTypes = [
    { key: 'social', label: 'Social Media', icon: 'person.2' },
    { key: 'email', label: 'Email Marketing', icon: 'envelope' },
    { key: 'ppc', label: 'Pay-Per-Click', icon: 'magnifyingglass' },
    { key: 'seo', label: 'SEO', icon: 'chart.line.uptrend.xyaxis' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Campaign",
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
          },
        }}
      />
      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Campaign Details</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Campaign Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter campaign name"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Client *</Text>
              <TextInput
                style={styles.input}
                placeholder="Select or enter client name"
                placeholderTextColor={colors.textSecondary}
                value={formData.client}
                onChangeText={(value) => updateFormData('client', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Campaign Type</Text>
              <View style={styles.typeSelector}>
                {campaignTypes.map((type) => (
                  <Pressable
                    key={type.key}
                    style={[
                      styles.typeOption,
                      formData.type === type.key && styles.typeOptionSelected
                    ]}
                    onPress={() => updateFormData('type', type.key)}
                  >
                    <IconSymbol 
                      name={type.icon as any} 
                      color={formData.type === type.key ? 'white' : colors.primary} 
                      size={20} 
                    />
                    <Text style={[
                      styles.typeLabel,
                      formData.type === type.key && styles.typeLabelSelected
                    ]}>
                      {type.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Budget *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter budget amount"
                placeholderTextColor={colors.textSecondary}
                value={formData.budget}
                onChangeText={(value) => updateFormData('budget', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.dateRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Start Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.startDate}
                  onChangeText={(value) => updateFormData('startDate', value)}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>End Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.endDate}
                  onChangeText={(value) => updateFormData('endDate', value)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the campaign objectives and strategy"
                placeholderTextColor={colors.textSecondary}
                value={formData.description}
                onChangeText={(value) => updateFormData('description', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log("Save campaign:", formData);
                router.back();
              }}
              disabled={!formData.name || !formData.client || !formData.budget}
            >
              Create Campaign
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  typeOptionSelected: {
    backgroundColor: colors.primary,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginLeft: 6,
  },
  typeLabelSelected: {
    color: 'white',
  },
  dateRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    paddingVertical: 20,
  },
});
