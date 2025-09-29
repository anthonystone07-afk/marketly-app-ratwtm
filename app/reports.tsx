
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

interface Report {
  id: string;
  title: string;
  type: 'monthly' | 'campaign' | 'client' | 'performance';
  date: string;
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
}

export default function ReportsScreen() {
  console.log("Reports screen loaded");

  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'December Monthly Report',
      type: 'monthly',
      date: '2024-12-01',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Holiday Campaign Analysis',
      type: 'campaign',
      date: '2024-12-15',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'TechCorp Client Report',
      type: 'client',
      date: '2024-12-10',
      status: 'ready',
      size: '3.2 MB'
    },
    {
      id: '4',
      title: 'Q4 Performance Summary',
      type: 'performance',
      date: '2024-12-20',
      status: 'generating',
      size: 'Generating...'
    },
    {
      id: '5',
      title: 'January Monthly Report',
      type: 'monthly',
      date: '2025-01-01',
      status: 'scheduled',
      size: 'Scheduled'
    }
  ]);

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Back pressed");
        router.back();
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="chevron.left" color={colors.text} size={24} />
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Create report pressed");
        router.push("/create-report");
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="plus" color={colors.text} size={24} />
    </Pressable>
  );

  const getReportTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'monthly':
        return 'calendar';
      case 'campaign':
        return 'megaphone';
      case 'client':
        return 'person';
      case 'performance':
        return 'chart.bar';
      default:
        return 'doc.text';
    }
  };

  const getReportTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'monthly':
        return colors.primary;
      case 'campaign':
        return colors.secondary;
      case 'client':
        return colors.accent;
      case 'performance':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return colors.success;
      case 'generating':
        return colors.warning;
      case 'scheduled':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'generating':
        return 'Generating';
      case 'scheduled':
        return 'Scheduled';
      default:
        return 'Unknown';
    }
  };

  const renderReport = (report: Report) => (
    <Pressable
      key={report.id}
      style={commonStyles.card}
      onPress={() => {
        console.log(`Report ${report.title} pressed`);
        if (report.status === 'ready') {
          router.push(`/report-details?id=${report.id}`);
        }
      }}
      disabled={report.status !== 'ready'}
    >
      <View style={styles.reportHeader}>
        <View style={styles.reportInfo}>
          <View style={styles.reportTitleRow}>
            <View style={[styles.typeIcon, { backgroundColor: getReportTypeColor(report.type) }]}>
              <IconSymbol name={getReportTypeIcon(report.type) as any} color="white" size={16} />
            </View>
            <Text style={styles.reportTitle}>{report.title}</Text>
          </View>
          <Text style={commonStyles.textSecondary}>Generated on {report.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{getStatusText(report.status)}</Text>
        </View>
      </View>

      <View style={styles.reportFooter}>
        <Text style={commonStyles.textSecondary}>Size: {report.size}</Text>
        {report.status === 'ready' && (
          <View style={styles.reportActions}>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                console.log(`Download report ${report.id}`);
              }}
            >
              <IconSymbol name="arrow.down.circle" color={colors.primary} size={20} />
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => {
                console.log(`Share report ${report.id}`);
              }}
            >
              <IconSymbol name="square.and.arrow.up" color={colors.primary} size={20} />
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );

  const readyReports = reports.filter(r => r.status === 'ready').length;
  const generatingReports = reports.filter(r => r.status === 'generating').length;
  const scheduledReports = reports.filter(r => r.status === 'scheduled').length;

  const quickReports = [
    { title: 'Weekly Summary', description: 'Quick overview of this week&apos;s performance' },
    { title: 'Client Performance', description: 'Individual client performance metrics' },
    { title: 'Campaign ROI', description: 'Return on investment for all campaigns' },
    { title: 'Traffic Analysis', description: 'Website and social media traffic breakdown' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Reports",
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
          {/* Stats Overview */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.success }]}>{readyReports}</Text>
                  <Text style={commonStyles.metricLabel}>Ready</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.warning }]}>{generatingReports}</Text>
                  <Text style={commonStyles.metricLabel}>Generating</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.primary }]}>{scheduledReports}</Text>
                  <Text style={commonStyles.metricLabel}>Scheduled</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Reports */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Quick Reports</Text>
            <View style={styles.quickReportsGrid}>
              {quickReports.map((report, index) => (
                <Pressable
                  key={index}
                  style={styles.quickReportCard}
                  onPress={() => {
                    console.log(`Generate quick report: ${report.title}`);
                  }}
                >
                  <Text style={styles.quickReportTitle}>{report.title}</Text>
                  <Text style={styles.quickReportDescription}>{report.description}</Text>
                  <View style={styles.quickReportAction}>
                    <IconSymbol name="arrow.right.circle" color={colors.primary} size={24} />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Recent Reports */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Recent Reports</Text>
            {reports.length > 0 ? (
              reports.map(renderReport)
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="doc.text" color={colors.textSecondary} size={48} />
                <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                  No reports available
                </Text>
                <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                  Create your first report to get started
                </Text>
              </View>
            )}
          </View>

          {/* Generate Custom Report */}
          <View style={commonStyles.section}>
            <View style={styles.customReportCard}>
              <View style={styles.customReportContent}>
                <Text style={styles.customReportTitle}>Need a Custom Report?</Text>
                <Text style={styles.customReportDescription}>
                  Generate a personalized report with specific metrics and date ranges
                </Text>
              </View>
              <Button
                variant="outline"
                onPress={() => {
                  console.log("Create custom report pressed");
                  router.push("/create-custom-report");
                }}
              >
                Create Report
              </Button>
            </View>
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  quickReportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickReportCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 120,
  },
  quickReportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  quickReportDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    flex: 1,
  },
  quickReportAction: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  customReportCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  customReportContent: {
    flex: 1,
    marginRight: 16,
  },
  customReportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  customReportDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
});
