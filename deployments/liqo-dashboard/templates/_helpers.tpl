{{- define "liqo-dashboard.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "liqo-dashboard.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "liqo-dashboard.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "liqo-dashboard.serviceAccountName" -}}
{{ .Values.backend.serviceAccount.name | default (include "liqo-dashboard.fullname" .) }}
{{- end }}

{{- define "liqo-dashboard.backendSelector" -}}
app: {{ include "liqo-dashboard.fullname" . }}-backend
{{- end }}

{{- define "liqo-dashboard.frontendSelector" -}}
app: {{ include "liqo-dashboard.fullname" . }}-frontend
{{- end }}