import { spawn } from 'child_process'

function pause(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

function runShellCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const process = spawn(command, { shell: true })

        process.stdout.on('data', (data) => {
            console.log(data.toString())
        })

        process.stderr.on('data', (errData) => {
            console.error(errData.toString())
        })

        process.on('close', (code) => {
            if (code === 0) {
                // Success
                resolve()
            } else {
                reject(new Error('Process exited with code : ' + code?.toString())) // Non-zero exit code indicates failure
            }
        })

        process.on('error', (err) => {
            reject(err) // Errors during the execution of the command
        })
    })
}

while (true) {
    // Try to execute the cypress scraper each 2m
    const startTime = Date.now()

    try {
        const command = 'npx cypress run'

        await runShellCommand(command)

        console.log('Command completed successfully.')
    } catch (err) {
        console.error('Command failed : ' + err)
    }

    const elapsedTime = Date.now() - startTime

    console.log('Command executed in ' + elapsedTime.toString() + ' ms')

    // 30 sec
    const minTime: number = 30 * 1000

    const remainingTime = minTime - elapsedTime

    if (remainingTime > 0) {
        await pause(remainingTime)
    }
}
