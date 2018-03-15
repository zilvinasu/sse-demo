package sse

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
class AppController() {
    val sseService = SseService()

    @GetMapping("/health")
    fun health() = mapOf("status" to "UP")

    @PostMapping("/v1/events")
    fun publish(@RequestBody event: Event) = sseService.publish(event)

    @GetMapping("/v1/events:subscribe")
    fun subscribe() = sseService.subscribe()
}
