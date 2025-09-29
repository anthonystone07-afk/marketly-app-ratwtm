import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function DashboardScreen() {
  console.log("Dashboard screen loaded");

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Settings pressed");
        router.push("/settings");
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="gear" color={colors.text} size={24} />
    </Pressable>
  );

  const quickActions = [
    { title: "Clients", icon: "person.2", route: "/(index)/clients-tab", color: colors.primary },
    { title: "Campaigns", icon: "megaphone", route: "/(index)/campaigns-tab", color: colors.secondary },
    { title: "Analytics", icon: "chart.bar", route: "/(index)/analytics-tab", color: colors.warning },
    { title: "Reports", icon: "doc.text", route: "/(index)/reports-tab", color: colors.accent },
  ];

  const renderQuickAction = (action: typeof quickActions[0], index: number) => (
    <Pressable
      key={index}
      style={[styles.quickActionCard, { borderLeftColor: action.color }]}
      onPress={() => {
        console.log(`Navigating to ${action.route}`);
        router.push(action.route as any);
      }}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <IconSymbol name={action.icon as any} color="white" size={20} />
      </View>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
      <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Dashboard",
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
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={commonStyles.title}>Welcome Back!</Text>
            <Text style={commonStyles.subtitle}>Here&apos;s your business overview</Text>
          </View>

          {/* Key Metrics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Key Metrics</Text>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.primary }]}>24</Text>
                  <Text style={commonStyles.metricLabel}>Active Clients</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.secondary }]}>12</Text>
                  <Text style={commonStyles.metricLabel}>Running Campaigns</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.warning }]}>89%</Text>
                  <Text style={commonStyles.metricLabel}>Success Rate</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Recent Activity</Text>
            <View style={commonStyles.card}>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: colors.success }]} />
                <View style={styles.activityContent}>
                  <Text style={commonStyles.text}>New client onboarded</Text>
                  <Text style={commonStyles.textSecondary}>TechCorp - 2 hours ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
                <View style={styles.activityContent}>
                  <Text style={commonStyles.text}>Campaign performance updated</Text>
                  <Text style={commonStyles.textSecondary}>Social Media Boost - 4 hours ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
                <View style={styles.activityContent}>
                  <Text style={commonStyles.text}>Monthly report generated</Text>
                  <Text style={commonStyles.textSecondary}>December Analytics - 1 day ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
            {quickActions.map(renderQuickAction)}
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
  welcomeSection: {
    paddingTop: 20,
    paddingBottom: 8,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});
