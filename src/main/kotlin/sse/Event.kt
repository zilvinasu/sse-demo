package sse


data class Event(val id: String, val type: String?, val data: Map<String, Any>)